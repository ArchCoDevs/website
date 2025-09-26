export type SiteStatus = {
  /**
   * The status of the site
   */
  available: boolean;
  /**
   * The message to display
   */
  message?: string;
  /**
   * The friendly name of the status
   */
  status?: string;
};

export default SiteStatus;
