import { sendEmail, encryptPassword } from '../utilities';
import { respond } from '../respond';
import { UnverifiedError, FormValidationError } from '../errors';

export const EMAIL_VERIFIED_STATUS = {
  UNVERIFIED: 'unverified',
  VERIFIED: 'verified',
  NEW_USER: 'new_user',
};

export const sendVerifyEmail = async (req, userId) => {
  const { models } = req;
  const user = await models.user.findById(userId);

  sendEmailVerification(user);
};

const sendEmailVerification = async user => {
  const verifyHash = encryptPassword(user.email + user.password_hash, user.password_salt);
  const resetUrl = process.env.VERIFY_EMAIL_URL.replace('{token}', verifyHash);

  const emailBody = `Thank you for registering with tupaia.org
                    Please click on the following link to register your email address

                    ${resetUrl}
                    
                    If you believe this email was sent to you in error, please contact us immediately at
                    admin@tupaia.org.
                    `;

  sendEmail(user.email, 'Tupaia email verification', emailBody);
};

export async function verifyEmail(req, res) {
  const { models } = req;
  const { token } = req.body;

  // search for unverified emails first - if we don't find any try for emails already verified so we don't pass an error back if the user clicks the link twice
  const verifiedUser =
    (await verifyEmailHelper(
      models,
      [EMAIL_VERIFIED_STATUS.UNVERIFIED, EMAIL_VERIFIED_STATUS.NEW_USER],
      token,
    )) || (await verifyEmailHelper(models, EMAIL_VERIFIED_STATUS.VERIFIED, token));

  if (verifiedUser) {
    verifiedUser.verified_email = EMAIL_VERIFIED_STATUS.VERIFIED;
    models.user.updateById(verifiedUser.id, verifiedUser);

    respond(res, { emailVerified: 'true' });
  } else throw UnverifiedError('Email address could not be verified');
}

async function verifyEmailHelper(models, searchCondition, token) {
  const users = await models.user.find({
    verified_email: searchCondition,
  });

  const verifiedUser = users.find(
    x => encryptPassword(x.email + x.password_hash, x.password_salt) === token,
  );

  return verifiedUser;
}

export const requestResendEmail = async (req, res) => {
  const { body, models } = req;
  const { emailAddress } = body;
  if (!emailAddress) {
    throw new FormValidationError('No email address provided', ['emailAddress']);
  }

  const user = await models.user.findOne({
    email: emailAddress,
  });

  // if the user doesn't exist or the email address has already been verified do not give the user any extra information
  if (!user || user.verified_email === EMAIL_VERIFIED_STATUS.VERIFIED) {
    throw new FormValidationError(`Unable to send verification email to ${emailAddress}`);
  }

  sendEmailVerification(user);
  respond(res, {
    success: true,
  });
};
