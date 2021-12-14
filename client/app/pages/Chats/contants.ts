import { EEmitterEvents } from "/client/data/hooks/useEventEmitter/events";
import ClientMessages from "/imports/client/clientMessages";

export const useEventEmitterProps = {
  event: EEmitterEvents.MESSAGES_FETCH,
  tracker: () => ClientMessages.subscribe(),
  shouldTrackerUnmount: true,
};
