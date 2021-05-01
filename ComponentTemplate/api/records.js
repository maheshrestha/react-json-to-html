import {
  getJSON,
  postJSON,
} from '../../common/api/xhr';
import { 
  DATA_CREAT_ENDPOINT_POST, 
  DATA_READ_ENDPOINT_GET, 
  DATA_UPDATE_ENDPOINT_POST, 
  DATA_DELETE_ENDPOINT_GET,

  RECORD_CLASS_NAME,
  PARENT_OBJECT_CLASS,
  PARENT_RESOURCE_ID
} from '../constants';
import { normalize } from 'normalizr';


import {{ componentName }}ApiSchema from '../schemas/{{ componentName }}ApiSchema';
import { api_list_output as response } from '../../api_output'

export async function fetch{{ componentName }}(queryParams: String = ''): Promise<*> {
  // const url = `${DATA_READ_ENDPOINT_GET}?${queryParams}`;
  // const response = await getJSON(url);
  return normalize(response, {{ componentName }}ApiSchema);
  if (response.status < 500 && typeof response.data === 'object') {
    return normalize(response.data, {{ componentName }}ApiSchema);
  }
  return false;
}

export async function get{{ componentName }}(): Promise<*> {
  const url = '/my_team/my_team_members.json';
  const data = {};
  const response = await getJSON(url, data);
  return response.data;
}

export async function sendAdd{{ componentName }}(
  props: Object
): Promise<*> {
  const data = {
    form: {
      properties_attributes: props
    },
    form_configuration_name: ADD_RECORD_FORM,
    resource_class: RECORD_CLASS_NAME,
    resource_id: 'new',
    parent_resource_class: PARENT_OBJECT_CLASS,
    parent_resource_id: PARENT_RESOURCE_ID
  };
  const parse_json = await postJSON(DATA_CREAT_ENDPOINT_POST, data);
  console.log(parse_json);
  return parse_json;
}

export async function sendRemove{{ componentName }}(id: string): Promise<*> {
  const url = '/my_team/remove_from_my_team.json' + '?id=' + id;
  const response = await getJSON(url);
  console.log('response: ', response);
  return !response.data.error;
}
