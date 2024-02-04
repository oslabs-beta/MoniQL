/**
 * monitor object shape:
 * {
 *   type: string,
 *   user_id: number,
 *   params: object,
 * }
 */

const monitorObjectCreator = (type, user_id, params) => {
  return {
    type: type,
    user_id: user_id,
    params: params,
  }
}

export default monitorObjectCreator;