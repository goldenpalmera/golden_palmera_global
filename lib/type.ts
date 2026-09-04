export type CreateInquiryResult =
  | {
      success: false;
      error: string;
    }
  | {
      success: true;
      reference: string;
      message: string;
      emailWarning?: boolean;
    };
