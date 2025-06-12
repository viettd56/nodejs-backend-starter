export type VerifyOrderJobData = {
    verify_id: string;
};
export type SendRequestData = {
    method: 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK';
    url: string;
    headers?: Record<string, string>;
    body?: any;
    params?: any;
};
export type SendEmailData = {
    to: string;
    subject: string;
    html: string;
};
