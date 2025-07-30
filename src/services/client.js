import { createClient } from '@supabase/supabase-js'

const URL = 'https://vmichfxyeujvllkuaqrn.supabase.co'
const API_KEY = 'APIKEY'
export const supabase = createClient(URL, API_KEY)

// Create a new player
export const createPlayer = async (playerData) => {
  try {
    const { data, error } = await supabase
      .from("players")
      .insert({
        playerName: playerData.name,
        position: playerData.position,
        jerseyNumber: playerData.jerseyNumber,
        goalsScored: playerData.goalsScored || 0,
        gamesPlayed: playerData.gamesPlayed || 0,
      })
      .select();

    if (error) throw error;
    return { data: data[0], error: null };
  } catch (error) {
    console.error('Error creating player:', error);
    return { data: null, error };
  }
};

// Get all players
export const getAllPlayers = async () => {
  try {
    const { data, error } = await supabase
      .from("players")
      .select("*")
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching players:', error);
    return { data: null, error };
  }
};

// Get a single player by ID
export const getPlayerById = async (id) => {
  try {
    const { data, error } = await supabase
      .from("players")
      .select("*")
      .eq('id', id)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching player:', error);
    return { data: null, error };
  }
};

// Update a player
export const updatePlayer = async (id, playerData) => {
  try {
    const { data, error } = await supabase
      .from("players")
      .update({
        playerName: playerData.name,
        position: playerData.position,
        jerseyNumber: playerData.jerseyNumber,
        goalsScored: playerData.goalsScored,
        gamesPlayed: playerData.gamesPlayed,
      })
      .eq('id', id)
      .select();

    if (error) throw error;
    return { data: data[0], error: null };
  } catch (error) {
    console.error('Error updating player:', error);
    return { data: null, error };
  }
};

// Delete a player
export const deletePlayer = async (id) => {
  try {
    const { error } = await supabase
      .from("players")
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error deleting player:', error);
    return { error };
  }
};

