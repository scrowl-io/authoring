export const formatResponse = (response: any) => {
  const {
    location,
    completion_status,
    completion_threshold,
    credit,
    entry,
    launch_data,
    learner_id,
    learner_name,
    max_time_allowed,
    mode,
    progress_measure,
    scaled_passing_score,
    success_status,
    suspend_data,
    time_limit_action,
    total_time,
    ...rest
  } = response;
  let parsedLocation;

  if (location) {
    parsedLocation = JSON.parse(location);
  }

  rest['location'] = parsedLocation;
  rest['completion_status'] = completion_status;
  rest['completion_threshold'] = completion_threshold;
  rest['credit'] = credit;
  rest['entry'] = entry;
  rest['launch_data'] = launch_data;
  rest['learner_id'] = learner_id;
  rest['learner_name'] = learner_name;
  rest['max_time_allowed'] = max_time_allowed;
  rest['mode'] = mode;
  rest['progress_measure'] = progress_measure;
  rest['scaled_passing_score'] = scaled_passing_score;
  rest['success_status'] = success_status;
  rest['suspend_data'] = suspend_data;
  rest['time_limit_action'] = time_limit_action;
  rest['total_time'] = total_time;

  return JSON.stringify(rest, null, 2);
};

export default {
  formatResponse,
};
