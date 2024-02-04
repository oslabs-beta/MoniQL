import { v4 } from 'uuid';

const monitorObjectCreator = (type, user_id, params) => {
  return {
    type: type,
    user_id: user_id,
    params: params,
    monitor_id: v4()
  }
}

export default monitorObjectCreator;