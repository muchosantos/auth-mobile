import { supabase } from "@/lib/supabase";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface UserProfile {
  id: string;
  avatar_url: string;
  email: string;
  full_name: string;
  username:string;
  // ostala polja
}

export const fetchUserProfile = createAsyncThunk(
  "user/fetchProfile",
  async (userId: string, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) throw error;
      console.log("error iz try", error);
      return data;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    profile: null as UserProfile | null,
    loading: false,
    error: null as string | null,
  },
  reducers: {
    clearUser: (state) => {
      state.profile = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        console.log(action.payload);
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string | null;
      });
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
