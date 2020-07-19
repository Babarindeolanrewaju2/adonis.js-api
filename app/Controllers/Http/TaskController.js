"use strict";

const Task = use("App/Models/Task");
const { validate } = use("Validator");

class TaskController {
  async index({ response }) {
    const tasks = await Task.all();

    return response.status(200).json(tasks);
  }

  async store({ request, response }) {
    // validate form input
    const validation = await validate(request.all(), {
      title: "required|min:3|max:255",
    });

    // show error messages upon validation fail
    if (validation.fails()) {
      return response.status(400).json(validation.messages());
    }

    // persist to database
    const task = new Task();
    task.title = request.input("title");
    await task.save();

    return response.status(201).json(task);
  }

  async show({ params, response }) {
    const task = await Task.find(params.id);
    if (!task) {
      return response.status(404).json(null);
    }
    return response.json(book);
  }

  async put({ params, request, response }) {
    const taskInfo = request.only("title");

    const task = await Task.find(params.id);
    task.title = taskInfo.title;

    await book.save(task);
    return response.status(200).json(book);
  }

  async destroy({ params, response }) {
    const task = await Task.find(params.id);
    if (!task) {
      return response.status(404).json(null);
    }
    await task.delete();

    return response.json({ message: "Contact deleted!" });
  }
}

module.exports = TaskController;
