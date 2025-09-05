// Utility function to filter complaints based on time-based rules
export const shouldHideResolvedComplaint = (complaint: any): boolean => {
  if (complaint.status !== 'resolved') {
    return false; // Don't hide non-resolved complaints
  }

  const now = new Date();
  const resolvedAt = new Date(complaint.updatedAt || complaint.createdAt);
  
  // Get today's midnight (12:00 AM)
  const todayMidnight = new Date();
  todayMidnight.setHours(0, 0, 0, 0);
  
  // Hide resolved complaints that were resolved before today's midnight
  // This means after 12 AM, all complaints resolved yesterday or earlier will be hidden
  return resolvedAt < todayMidnight;
};

// Filter complaints to exclude resolved ones that should be hidden
export const filterVisibleComplaints = (complaints: any[]): any[] => {
  return complaints.filter(complaint => !shouldHideResolvedComplaint(complaint));
};

// Get complaints by status, excluding hidden resolved complaints
export const getFilteredComplaintsByStatus = (complaints: any[], status: string): any[] => {
  const filteredComplaints = filterVisibleComplaints(complaints);
  return filteredComplaints.filter(c => c.status === status);
};
