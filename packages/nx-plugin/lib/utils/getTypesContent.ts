export const getTypesContent = (moduleType: 'es6' | 'commonjs' | 'ts', type: string) => {
  if (moduleType === 'ts') {
    const declaration = `Canvas${type}${type !== 'Graphic' ? 'Icon' : ''}`;

    return `export declare enum CanvasIconTypes {\n\t/** @deprecated */\n\tAccent = "accent",\n\t/** @deprecated */\n\tApplet = "applet",\n\tExpressive = "expressive",\n\tSystem = "system",\n\tGraphic = "graphic",\n}\n\nexport interface ${declaration} {\n\tname: string;\n\ttype: CanvasIconTypes.${type};\n\tsvg: string;\n\tfilename: string;\n\tcategory?: string;\n\ttags?: string[];\n}\n`;
  }

  if (moduleType === 'es6') {
    return `export const CanvasIconTypes = {\n\tAccent: "accent",\n\tApplet: "applet",\n\tExpressive: "expressive",\n\tSystem: "system",\n\tGraphic: "graphic",\n}`;
  }

  if (moduleType === 'commonjs') {
    const header = `"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\n\n`;
    const enumDeclaration = `(function (CanvasIconTypes) {\n\tCanvasIconTypes["Accent"] = "accent";\n\tCanvasIconTypes["Applet"] = "applet";\n\tCanvasIconTypes["Expressive"] = "expressive";\n\tCanvasIconTypes["System"] = "system";\n\tCanvasIconTypes["Graphic"] = "graphic";\n})(exports.CanvasIconTypes || (exports.CanvasIconTypes = {}));`;

    return header + enumDeclaration;
  }

  return '';
};
