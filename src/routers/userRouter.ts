import { Router } from 'express';
import { User } from '#models';

const userRouter = Router();

userRouter.post('/', async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    const userObj = newUser.toObject() as { [key: string]: any };
    delete userObj.password;
    res.status(201).json(userObj);
  } catch (error: any) {
    console.error('Error creating user:', error);
    return res.status(400).json({ error: error.message });
  }
});

userRouter.get('/', async (req, res) => {
  try {
    const users = await User.find({}).select('-password'); // Exclude password
    if (users.length === 0) {
      res.json({ message: 'No users found' });
    }
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users.' });
  }
});

userRouter.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user.' });
  }
});

userRouter.put('/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        updatedAt: new Date().toISOString(),
      },
      { new: true }
    ).select('-password');
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error: any) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user.' });
  }
});

userRouter.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    const userObj = deletedUser.toObject() as { [key: string]: any };
    delete userObj.password;
    res.json({ message: 'User deleted Successfully', user: userObj });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user.' });
  }
});

export default userRouter;
