const LOCAL_KEY = "todomvc";

// 获取目前所有的任务
export function fetch() {
  const result = localStorage.getItem(LOCAL_KEY);
  if (result) {
    return JSON.parse(result);
  }
  return [];
}

// 保存所有任务
export function save(todos) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(todos));
}

/**
 *  生成任务的唯一编号
 */
export function generateId() {
  return Date.now() + Math.random().toString(16).substr(2, 4);
}

// 筛选
export function filter(todos, visibility) {
  if (visibility === "all") {
    return todos;
  } else if (visibility === "active") {
    return todos.filter((i) => !i.completed);
  } else if (visibility === "completed") {
    return todos.filter((i) => i.completed);
  }
  throw new Error("invalid visibility value");
}
