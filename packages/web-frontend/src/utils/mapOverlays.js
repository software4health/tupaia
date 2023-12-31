/**
 * Tupaia
 * Copyright (c) 2017 - 2021 Beyond Essential Systems Pty Ltd.
 * This source code is licensed under the AGPL-3.0 license
 * found in the LICENSE file in the root directory of this source tree.
 */

export const getMapOverlaysFromHierarchy = (mapOverlayHierarchy, targetMapOverlayCodes) => {
  if (!targetMapOverlayCodes) {
    return [];
  }

  return flattenMapOverlayHierarchy(mapOverlayHierarchy)
    .filter(({ mapOverlayCode }) => targetMapOverlayCodes.includes(mapOverlayCode))
    .sort((mapOverlayA, mapOverlayB) => {
      return (
        targetMapOverlayCodes.findIndex(code => code === mapOverlayA.mapOverlayCode) -
        targetMapOverlayCodes.findIndex(code => code === mapOverlayB.mapOverlayCode)
      );
    });
};

export const checkHierarchyIncludesMapOverlayCodes = (
  mapOverlayHierarchy,
  targetMapOverlayCodes,
) => {
  if (!targetMapOverlayCodes || targetMapOverlayCodes?.length === 0) {
    return false;
  }
  const { length: resultLength } = getMapOverlaysFromHierarchy(
    mapOverlayHierarchy,
    targetMapOverlayCodes,
  );

  return resultLength === targetMapOverlayCodes.length;
};

export function flattenMapOverlayHierarchy(mapOverlayHierarchy) {
  const results = [];
  const flattenGroupedMeasure = ({ children }) => {
    children.forEach(childObject => {
      if (childObject.children && childObject.children.length) {
        flattenGroupedMeasure(childObject);
      } else {
        results.push(childObject);
      }
    });
  };
  mapOverlayHierarchy.forEach(measure => {
    if (measure.children) {
      flattenGroupedMeasure(measure);
    } else {
      results.push(measure);
    }
  });

  return results;
}

export const isMapOverlayHierarchyEmpty = mapOverlayHierarchy =>
  flattenMapOverlayHierarchy(mapOverlayHierarchy).length === 0;

export const updateOverlayConfigs = (mapOverlayHierarchy, overlayConfigsByCode) =>
  mapOverlayHierarchy.map(mapOverlay => {
    const { mapOverlayCode, children } = mapOverlay;
    const newConfig = overlayConfigsByCode[mapOverlayCode];
    if (newConfig) {
      return {
        ...mapOverlay,
        ...newConfig,
      };
    }
    if (children) {
      return {
        ...mapOverlay,
        children: updateOverlayConfigs(children, overlayConfigsByCode),
      };
    }
    return mapOverlay;
  });
