import { Record, Map, OrderedSet } from "immutable";

export const InitialEntitiesStore = Record({
  byId: Map(),
  allIds: OrderedSet(),
});
