import { createAsyncThunk } from "@reduxjs/toolkit";
import { addHabit, removeHabit, setHabits, updateHabit, } from "./habitsSlice";
import { Habit } from "../types/types";
import { RootState } from "./store";
import { auth } from "../firebaseConfig";

export const createHabit = createAsyncThunk(
  "habits/createHabit",
  async (habit: Habit, { getState, dispatch, rejectWithValue  }) => {
    let token = (getState() as RootState).user.token;

    if (!token) {
      const user = auth.currentUser;
      if (user) {
        try {
          token = await user.getIdToken(true);
          console.log("Refreshed Firebase token:", token);
        } catch (error) {
          console.error("Failed to refresh token:", error);
          return rejectWithValue("No token available or failed to refresh token.");
        }
      }
    }

    if (!token) {
      throw new Error("No token available");
    }
    

    try {
      const response = await fetch("http://localhost:5000/api/habits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(habit),
      });

      const data = await response.json();

      if (response.ok) {
        dispatch(addHabit(data.habit));
        return data.habit;
      } else {
        throw new Error(data.message || "Failed to create habit");
      }
    } catch (error) {
      
      console.error("Error creating habit:", error);
      throw error;
    }
  }
);

export const getHabits = createAsyncThunk(
  "habits/getHabits",
  async (_, { dispatch, getState, rejectWithValue }) => {
    let token = (getState() as RootState).user.token;

    if (!token) {
      const user = auth.currentUser;
      if (user) {
        try {
          token = await user.getIdToken(true);
          console.log("Refreshed Firebase token:", token);
        } catch (error) {
          console.error("Failed to refresh token:", error);
          return rejectWithValue("No token available or failed to refresh token.");
        }
      }
    }
    
    if (!token) {
      throw new Error("No token available");
    }

    try {
      const response = await fetch("http://localhost:5000/api/habits", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      });

      const data = await response.json();

      if (response.ok) {
        dispatch(setHabits(data.data));
        return data.data;
      } else {
        throw new Error(data.message || "Failed to get habits");
      }
    } catch (error) {
      console.error("Error getting habits:", error);
      throw error;
    }
  }
);

export const deleteHabit = createAsyncThunk(
  'habits/deleteHabit',
  async (habitId: string, { getState, dispatch, rejectWithValue }) => {
    let token = (getState() as RootState).user.token;

    if (!token) {
      const user = auth.currentUser;
      if (user) {
        try {
          token = await user.getIdToken(true);
          console.log('Refreshed Firebase token:', token);
        } catch (error) {
          console.error('Failed to refresh token:', error);
          return rejectWithValue('No token available or failed to refresh token.');
        }
      }
    }

    if (!token) {
      throw new Error('No token available');
    }

    try {
      const response = await fetch(`http://localhost:5000/api/habits/${habitId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        dispatch(removeHabit(habitId));
        return habitId;
      } else {
        throw new Error(data.message || 'Failed to delete habit');
      }
    } catch (error) {
      console.error('Error deleting habit:', error);
      throw error;
    }
  }
);

export const updateHabitAsync = createAsyncThunk(
  'habits/updateHabit',
  async ({ habitId, habitData }: { habitId: string; habitData: any }, { getState, dispatch, rejectWithValue }) => {
    let token = (getState() as RootState).user.token;

    if (!token) {
      const user = auth.currentUser;
      if (user) {
        try {
          token = await user.getIdToken(true);
          console.log("Refreshed Firebase token:", token);
        } catch (error) {
          console.error("Failed to refresh token:", error);
          return rejectWithValue("No token available or failed to refresh token.");
        }
      }
    }

    if (!token) {
      throw new Error("No token available");
    }

    try {
      const response = await fetch(`http://localhost:5000/api/habits/${habitId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(habitData),
      });

      const data = await response.json();

      if (response.ok) {
        dispatch(updateHabit(data.data));
        return data.data;
      } else {
        throw new Error(data.message || 'Failed to update habit');
      }
    } catch (error) {
      console.error('Error updating habit:', error);
      throw error;
    }
  }
);