/**
 * Tupaia MediTrak
 * Copyright (c) 2020 Beyond Essential Systems Pty Ltd
 */
import { expect } from 'chai';
import { it, describe } from 'mocha';

import { mapFacilityToOrgUnitIds } from '/apiV1/utils/mapFacilityToOrgUnitIds';

const organisationUnits = [
  {
    code: 'SB_Guadalcanal Province',
    name: 'Guadalcanal Province',
    id: 'As8RCJJNVGC',
    description: '{"level":"District"}',
    comment: '[[-10.59505396,158.59292748800002],[-9.181143,161.338592912]]',
    children: [
      { code: 'SB_10503', level: 4, id: 'IYRU3RH79ti' },
      { code: 'SB_10203', level: 4, id: 'GqumUN45VC8' },
      { code: 'SB_10601', level: 4, id: 'HxGTP4vnkfn' },
    ],
  },
  {
    code: 'SB_Honiara',
    name: 'Honiara',
    id: 'xeNth7JPCGf',
    description: '{"level":"District"}',
    children: [
      { code: 'SB_90201', level: 4, id: 'ODdaT8ncTzt' },
      { code: 'SB_90301', level: 4, id: 'yLzHFimWVVF' },
      { code: 'SB_90305', level: 4, id: 'UbnIMaXikNf' },
      { code: 'SB_90205', level: 4, id: 'iyd21zEg9jS' },
    ],
  },
];

describe('mapFacilityToOrgUnitIds', () => {
  it('should map facility ids to ids', () => {
    try {
      const result = mapFacilityToOrgUnitIds(organisationUnits);
      expect(result['As8RCJJNVGC']).to.equal('As8RCJJNVGC');
      expect(result['IYRU3RH79ti']).to.equal('As8RCJJNVGC');
      expect(result['GqumUN45VC8']).to.equal('As8RCJJNVGC');
      expect(result['xeNth7JPCGf']).to.equal('xeNth7JPCGf');
      expect(result['UbnIMaXikNf']).to.equal('xeNth7JPCGf');
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  });
});
