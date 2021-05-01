// @flow
import { Record, Map, OrderedSet } from 'immutable';
import type { RecordOf } from 'immutable';

export type EntitiesByIdStore<T> = Map<string, T>;
export type EntityIdsStore = OrderedSet<string, string>;
export type EntitiesStore<T> = RecordOf<{ byId: EntitiesByIdStore<T>, allIds: EntityIdsStore }>;

export const InitialEntitiesStore = Record({ byId: Map(), allIds: OrderedSet() });
