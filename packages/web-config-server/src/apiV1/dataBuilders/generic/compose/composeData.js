import { fetchComposedData } from '/apiV1/dataBuilders/helpers';
import { NO_DATA_AVAILABLE } from '../../constants'
/**
 * Configuration schema
 * @typedef {Object} ComposeDataConfig
 * @property {string} sortOrder
 * @property {Object<string, { dataBuilder, dataBuilderConfig }>} dataBuilders
 *
 */

export const composeData = async (config, aggregator, dhisApi) => {
  const { dataBuilders } = config.dataBuilderConfig;
  const responses = await fetchComposedData(config, aggregator, dhisApi);

  const data = [];
  Object.entries(responses).forEach(([name, { data: responseData }]) => {
    if (!responseData || responseData.length === 0) return;
    const responseObj = {};
    responseData.forEach(({ name: dataPointName, value }) => {
      if (!(value === NO_DATA_AVAILABLE)) {
        responseObj[dataPointName] = value;
      }
    });
    data.push({ ...responseObj, name });
  });

  const getSortOrder = element => dataBuilders[element.name].sortOrder || 0;

  data.sort((el1, el2) => getSortOrder(el1) - getSortOrder(el2));

  return { data };
};
