export type NormalizedDefaultProfile = {
  id: string,
  picture: NormalizedPicture
};

export type NormalizedPicture = {
  id: string,
  thumb: string
};

export type NormalizedUser = {
  id: string,
  slug: string,
  firstName: string,
  lastName: string,
  name: string,
  profilePicture: string,
  suburb: string,
  postcode: string,
  state: string,
  address: string
};

export type NormalizedMyTeamMember = {
  id: string,
  clientId: string,
  carerId: string,
  client: NormalizedUser,
  carer: NormalizedUser
};

export type NormalizedMyTeamMembersApiCall = {
  entities: {
    myTeamMembers?: { [string]: NormalizedMyTeamMember }
  },
  result: {
    my_team_members: {
      total_entries: number,
      results: Array<string>
    }
  }
};
