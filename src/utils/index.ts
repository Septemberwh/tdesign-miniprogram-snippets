import { workspace } from 'vscode';

export function autoConfig() {
  let c = workspace.getConfiguration();
  const updates: { key: string; map: any }[] = [
    {
      key: 'files.associations',
      map: {
        '*.cjson': 'jsonc',
        '*.wxss': 'css',
        '*.wxs': 'javascript',
      },
    },
    {
      key: 'emmet.includeLanguages',
      map: {
        wxml: 'html',
      },
    },
  ];

  updates.forEach(({ key, map }) => {
    let oldMap = c.get(key, {}) as any;
    let appendMap: any = {};
    Object.keys(map).forEach(k => {
      if (!oldMap.hasOwnProperty(k)) {
        appendMap[k] = map[k];
      }
    });
    if (Object.keys(appendMap).length) {
      c.update(key, { ...oldMap, ...appendMap }, true);
    }
  });

  c.update('tdesign-miniprogram-snippets.disableAutoConfig', true, true);
}
export function schemes(key: string) {
  return { scheme: 'file', language: key };
}