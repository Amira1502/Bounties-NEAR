/**
 * POST handler
 *  */
 const addProject = async (req, res) => {
    try {
      const { title, description } = req.body
      // handling errors : titre & description are required
      if (!description || !title) {
        res.status(400).send({ msg: 'Title and description are required !!!' })
        return;
      }
  
      // handling errors : test if contact already exist with email
      const project = await Project.findOne({ title })
      if (project) {
        res.status(400).send({ msg: 'Project already exist !!!' })
        return;
      }
  
      // create and save the new contact
      const newProject = new Project({ title, description })
      await newProject.save()
      res.status(200).send({ msg: 'Project added successfully ...', newProject })
  
    } catch (error) {
      res.status(500).send({ msg: "impossible to add new project", error })
    }
  }

  /**
 * GET all
 *  */
const getAllProjects = async (req, res) => {
  try {
    const listProjects = await Project.find()
    res.status(200).send({ msg: 'This is the list of projects ...', listProjects })
  } catch (error) {
    res.status(400).send({ msg: 'Can not get all projects !!', error })
  }
}


/**
 * GET one project
 *  */
const getProject = async (req, res) => {
  try {
    const { _id } = req.params
    const projectToFind = await Project.findOne({ _id })
    console.log(projectToFind)
    res.status(200).send({ msg: 'I find the project ...', projectToFind })
  } catch (error) {
    res.status(400).send({ msg: 'Can not get project with this id !!', error })
  }
}


/**
 * delete project
 *  */
const deleteProject = async (req, res) => {
  const { _id } = req.params
  try {
    const projectToDelete = await Project.findOneAndRemove({ _id })
    // console.log(projectToDelete)
    if (!projectToDelete) {
      res.status(200).send({ msg: 'Project already deleted ...' })
      return
    }
    res.status(200).send({ msg: 'Project deleted ...', projectToDelete })
  } catch (error) {
    res.status(400).send({ msg: 'Can not delete project with this id !!', error })
  }
}


/**
 * edit project
 *  */
const editProject = async (req, res) => {
  // const { title, description } = req.body
  const { _id } = req.params
  try {
    const projectToEdit = await Project.updateOne({ _id }, { $set: { ...req.body } })
    // console.log(contactToEdit)
    if (!projectToEdit.nModified) {
      res.status(400).send({ msg: 'Project already updated ..', projectsToEdit })
      return
    }
    res.status(200).send({ msg: 'Project updated ..', projectToEdit })
  } catch (error) {
    res.status(400).send({ msg: 'Can not edit project with this id !!', error })
  }
}


  // export module
  module.exports = { addProject, getProject, getAllProjects,deleteProject, editProject}