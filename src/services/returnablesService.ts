
import { supabase } from '@/integrations/supabase/client';
import { ReturnableEntry } from '@/types/returnable';

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
    const { data, error } = await supabase
      .from('Returnable Entry')
      .select('*')
      .eq('Trip ID', id)
      .single();
    
    if (error) {
      console.error('Error fetching returnable by ID:', error);
      throw error;
    }
    
    return data;
  },

  // Create a new returnable entry
  createReturnable: async (returnable: Omit<ReturnableEntry, 'id' | 'createdAt' | 'updatedAt'>) => {
    const entry = {
      'Trip ID': returnable.tripId,
      'Driver': returnable.driver, 
      'Customer': returnable.customer,
      'Item Type': returnable.itemType,
      'Quantity Out': returnable.quantityOut,
      'Quantity Returned': returnable.quantityReturned,
      'Status': returnable.status,
      'Notes': returnable.notes
    };

    const { data, error } = await supabase
      .from('Returnable Entry')
      .insert([entry])
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
    if (returnable.itemType) entry['Item Type'] = returnable.itemType;
    if (returnable.quantityOut !== undefined) entry['Quantity Out'] = returnable.quantityOut;
    if (returnable.quantityReturned !== undefined) entry['Quantity Returned'] = returnable.quantityReturned;
    if (returnable.status) entry['Status'] = returnable.status;
    if (returnable.notes) entry['Notes'] = returnable.notes;
    
    const { data, error } = await supabase
      .from('Returnable Entry')
      .update(entry)
      .eq('Trip ID', id)
      .select();
    
    if (error) {
      console.error('Error updating returnable:', error);
      throw error;
    }
    
    return data?.[0];
  }
};
