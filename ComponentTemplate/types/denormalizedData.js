// @flow
export type DenormalizedPicture = {
  id: string,
  thumb: string
};

export type DenormalizedDefaultProfile = {
  id: string,
  picture: DenormalizedPicture
};
export type DenormalizedUser = {
  id: string,
  slug: string,
  first_name: string,
  last_name: string,
  name: string,
  default_profile: DenormalizedDefaultProfile
};
export type DenormalizedMyTeamMember = {
  client_id: string,
  carer_id: string,
  client: DenormalizedUser,
  carer: DenormalizedUser
};
