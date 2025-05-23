
import { supabase } from '@/integrations/supabase/client';
import { ReturnableEntry, ReturnableStatus, ReturnableType } from '@/types/returnable';

export const returnablesService = {
  // Get all returnable entries
  getAllReturnables: async () => {
    const { data, error } = await supabase
      .from('Returnable Entry')
      .select('*');
    
    if (error) {
      console.error('Error fetching returnables:', error);
      throw error;
    }
    
    return data || [];
  },

  // Get a single returnable entry by ID
  getReturnableById: async (id: string) => {
    // Convert string ID to number for Supabase query
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new Error('Invalid ID format');
    }
    
    const { data, error } = await supabase
      .from('Returnable Entry')
      .select('*')
      .eq('Trip ID', numericId)
      .single();
    
    if (error) {
      console.error('Error fetching returnable by ID:', error);
      throw error;
    }
    
    return data;
  },

  // Create a new returnable entry
  createReturnable: async (returnable: Omit<ReturnableEntry, 'id' | 'createdAt' | 'updatedAt'>) => {
    // Convert string tripId to number
    const tripId = parseInt(returnable.tripId, 10);
    if (isNaN(tripId)) {
      throw new Error('Invalid Trip ID format');
    }
    
    const entry = {
      'Trip ID': tripId,
      'Driver': returnable.driver, 
      'Customer': returnable.customer,
      'Item Type': returnable.itemType as string, // Cast enum to string for DB
      'Quantity Out': returnable.quantityOut,
      'Quantity Returned': returnable.quantityReturned,
      'Status': returnable.status as string, // Cast enum to string for DB
      'Notes': returnable.notes
    };

    const { data, error } = await supabase
      .from('Returnable Entry')
      .insert(entry)
      .select();
    
    if (error) {
      console.error('Error creating returnable:', error);
      throw error;
    }
    
    return data?.[0];
  },

  // Update an existing returnable entry
  updateReturnable: async (id: string, returnable: Partial<ReturnableEntry>) => {
    const entry: Record<string, any> = {};
    
    if (returnable.driver) entry['Driver'] = returnable.driver;
    if (returnable.customer) entry['Customer'] = returnable.customer;
    if (returnable.itemType) entry['Item Type'] = returnable.itemType as string; // Cast enum to string
    if (returnable.quantityOut !== undefined) entry['Quantity Out'] = returnable.quantityOut;
    if (returnable.quantityReturned !== undefined) entry['Quantity Returned'] = returnable.quantityReturned;
    if (returnable.status) entry['Status'] = returnable.status as string; // Cast enum to string
    if (returnable.notes) entry['Notes'] = returnable.notes;
    
    // Convert string ID to number for Supabase query
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new Error('Invalid ID format');
    }
    
    const { data, error } = await supabase
      .from('Returnable Entry')
      .update(entry)
      .eq('Trip ID', numericId)
      .select();
    
    if (error) {
      console.error('Error updating returnable:', error);
      throw error;
    }
    
    return data?.[0];
  }
};
