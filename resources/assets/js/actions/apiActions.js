export const ASYNC_CALL = 'ASYNC_CALL';
export const POST_REQUEST = 'POST_REQUEST';

export function postRequest(resource, data) {
  return {
    type: POST_REQUEST,
    resource: resource,
    data: data
  };
}
