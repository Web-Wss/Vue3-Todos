import { ref, computed } from "vue";

export default function useEditTodo(todosRef) {
  const editingTodoRef = ref(null); //当前正在修改的是哪一个todo
  let originTitle = null; //缓存之前的title值
  const editTodo = (todo) => {
    originTitle = todo.title;
    editingTodoRef.value = todo;
  };
  const doneEdit = (todo) => {
    editingTodoRef.value = null;
    const title = todo.title.trim();
    if (title) {
      todo.title = title;
    } else {
      // 删除
      todosRef.value.splice(todosRef.value.indexOf(todo), 1);
    }
  };

  const cancelEdit = (todo) => {
    editingTodoRef.value = null;
    todo.title = originTitle;
  };
  const allDoneRef = computed(() => {
    return todosRef.value.filter((i) => !i.completed).length === 0;
  });

  function setAllChecked(checked) {
    todosRef.value.forEach((todo) => {
      todo.completed = checked;
    });
  }

  return {
    editingTodoRef,
    editTodo,
    doneEdit,
    cancelEdit,
    allDoneRef,
    setAllChecked,
  };
}
