import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  ReactNode,
  FormEvent,
} from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  create_task,
  delete_task,
  task_status_change,
} from "../store/features/Tasks/TasksSlice";
import date from "../utils/formatDate";
import formatDate from "../utils/formatDate";

type TaskDialogProps = {
  children: ReactNode;
};

export type TaskDialogHandle = {
  open: () => void;
  close: () => void;
};

const TaskDialog = forwardRef<TaskDialogHandle, TaskDialogProps>(
  ({ children }, ref) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useImperativeHandle(ref, () => ({
      open: () => {
        dialogRef.current?.showModal();
      },
      close: () => {
        dialogRef.current?.close();
      },
    }));

    // Close dialog on backdrop click
    const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
      if (e.target === dialogRef.current) {
        dialogRef.current?.close();
      }
    };

    return (
      <dialog
        id="myDialog"
        ref={dialogRef}
        aria-modal="true"
        aria-labelledby="dialogTitle"
        onClick={handleBackdropClick}
      >
        {children}
      </dialog>
    );
  }
);

type FormError = {
  title: boolean;
  etadate: boolean;
  detail: boolean;
};

const initialFormError: FormError = {
  title: false,
  etadate: false,
  detail: false,
};

const Tasks: React.FC = () => {
  const tasks = useSelector((state: any) => state.tasks);
  const dispatch = useDispatch();
  const taskDialogRef = useRef<TaskDialogHandle>(null);
  const createFormRef = useRef<HTMLFormElement>(null);
  const [errorBanner, setErrorBanner] = useState(false);
  const [formError, setFormError] = useState<FormError>(initialFormError);

  const handleCreateClick = () => {
    taskDialogRef.current?.open();
  };

  const handleCreate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const title = formData.get("title")?.toString().trim();
    const etadate = formData.get("etadate")?.toString().trim();
    const detail = formData.get("detail")?.toString().trim();

    const newFormError: FormError = {
      title: !title,
      etadate: !etadate,
      detail: !detail,
    };

    setFormError(newFormError);

    if (!title || !etadate || !detail) {
      setErrorBanner(true);
      return;
    }

    setErrorBanner(false);

    const format_etadate = formatDate(etadate);

    console.log(format_etadate);

    const data: any = {
      title,
      etadate: format_etadate,
      detail,
      priority: formData.get("priority"),
    };

    dispatch(create_task(data));
    console.log("form data", data);

    // Reset form and close dialog after successful creation
    resetForm();
    taskDialogRef.current?.close();
  };

  const handleTaskDelete = (id: string | number) => {
    dispatch(delete_task(id));
  };

  const resetForm = () => {
    createFormRef.current?.reset();
    setErrorBanner(false);
    setFormError(initialFormError);
  };

  const handleToggleChange = (id) => {
    dispatch(task_status_change(id));
  };

  return (
    <div className="tasks-container">
      <TaskDialog ref={taskDialogRef}>
        <h2 id="dialogTitle">Create Task</h2>
        {errorBanner && (
          <div className="error-banner">
            <ul>
              {formError.title && <li>Title is required</li>}
              {formError.etadate && <li>ETA is required</li>}
              {formError.detail && <li>Detail is required</li>}
            </ul>
          </div>
        )}
        <form
          ref={createFormRef}
          className="task-form"
          onSubmit={handleCreate}
          autoComplete="off"
        >
          <div className="input-section">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" />
          </div>
          <div className="input-section">
            <label htmlFor="priority">Priority</label>
            <select id="priority" name="priority" defaultValue="low">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="input-section">
            <label htmlFor="etadate">ETA</label>
            <input type="date" id="etadate" name="etadate" />
          </div>
          <div className="input-section">
            <label htmlFor="detail">Detail</label>
            <textarea name="detail" id="detail" />
          </div>
          <div className="task-form-actions">
            <button
              type="button"
              onClick={() => {
                resetForm();
                taskDialogRef.current?.close();
              }}
            >
              Cancel
            </button>
            <button type="submit" className="primary-button">
              Create
            </button>
          </div>
        </form>
      </TaskDialog>
      <h3>Task List</h3>
      <button className="task-create-btn" onClick={handleCreateClick}>
        Create 📇
      </button>

      {tasks.length === 0 && <p>No Tasks Found...</p>}

      {tasks && tasks.length > 0 && (
        <section className="task-list-container">
          {tasks.map((task) => (
            <div className="task-card" key={task.id}>
              <div className="task-action-container">
                <span onClick={() => handleTaskDelete(task.id)}>delete</span>
                <span>edit</span>
              </div>
              <h5>{task.title}</h5>
              <div className="task-sub-details">
                <time>{task.etadate}</time>
                <span className={`batch batch-${task.priority}`}>
                  {task.priority}
                </span>
                <i>{task.state}</i>
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={task.state === "completed"}
                    onChange={(e) => handleToggleChange(task.id)}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="text">{task.detail}</div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default Tasks;
