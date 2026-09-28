import React from 'react';
import type { AddonContext, AddonEnableFunction } from '@wealthfolio/addon-sdk';
import ImporterPage from './components/ImporterPage';

// The host owns the addon's React root and mounts the route component itself
// (with only a `location` prop), so capture the context at enable time.
let addonCtx: AddonContext | undefined;

function ImporterRoute() {
  return addonCtx ? <ImporterPage api={addonCtx.api} /> : null;
}

const enable: AddonEnableFunction = (ctx) => {
  addonCtx = ctx;

  // Sidebar link is declared in manifest.json (`contributes`); the route id
  // must match `contributes.routes[].id`.
  ctx.router.add({
    id: 'degiro-importer',
    path: '/addons/degiro-importer',
    component: ImporterRoute,
  });

  ctx.onDisable(() => {
    addonCtx = undefined;
  });
};

export default enable;
