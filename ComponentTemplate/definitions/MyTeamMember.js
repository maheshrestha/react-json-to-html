// @flow
import { Record, OrderedSet, Map } from 'immutable';
import type { RecordFactory, RecordOf } from 'immutable';

export type MyTeamMemberProps = {
  id: string,
  clientId: string,
  carerId: string
};

export const makeMyTeamMember: RecordFactory<MyTeamMemberProps> = Record({
  id: '',
  clientId: '',
  carerId: ''
});

export type MyTeamMember = RecordOf<MyTeamMemberProps>;

export function makeMyTeamMembers(payload: {
  [string]: MyTeamMemberProps
}): Map<string, MyTeamMember> {
  return Map(payload).map((props: MyTeamMemberProps): MyTeamMember =>
    makeMyTeamMember(props)
  );
}
