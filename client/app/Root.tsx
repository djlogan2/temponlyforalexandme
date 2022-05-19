import React from "react";

import Clienti18nReadOnlyDao from "/imports/client/dao/Clienti18nReadOnlyDao";
import ReadOnlyLoggerConfigurationDao from "/imports/client/dao/ReadOnlyLoggerConfigurationDao";
import SubscriptionService from "/imports/client/service/SubscriptionService";
import CommonReadOnlyUserDao from "/imports/dao/CommonReadOnlyUserDao";
import Clienti18n from "/lib/client/Clienti18n";
import ClientServer from "/lib/client/ClientServer";
import "../../lib/client/ClientServer";
import "../../lib/client/ICCGlobal";
import { ServicesProvider } from "./contexts/services";

import { ProvidersContainer } from "./ProvidersContainer";
import { App } from "./App";

//---
globalThis.subscriptionservice = new SubscriptionService(null);
globalThis.loggerconfigdao = new ReadOnlyLoggerConfigurationDao(
  null,
  window.subscriptionservice,
);

const userdao = new CommonReadOnlyUserDao(null);

globalThis.icc = new ClientServer(userdao);
//---

const i18ndao = new Clienti18nReadOnlyDao(null, subscriptionservice);
const i18nClient = new Clienti18n(null, i18ndao);

export const Root = () => (
  <ServicesProvider>
    <ProvidersContainer>
      <App />
    </ProvidersContainer>
  </ServicesProvider>
);
