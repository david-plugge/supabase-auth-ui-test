import { EmailOtpType, MobileOtpType, Provider } from '@supabase/supabase-js';
import { ThemeVariables } from './theming';
import { SOCIAL_LAYOUTS, VIEWS } from './constants';

export type SocialLayoutType = (typeof SOCIAL_LAYOUTS)[keyof typeof SOCIAL_LAYOUTS];
export type ViewType = (typeof VIEWS)[keyof typeof VIEWS];

export type RedirectTo = undefined | string;
export type OtpType = EmailOtpType | MobileOtpType;

export type ProviderScopes = {
  [key in Partial<Provider>]: string;
};

export interface Theme {
  default: ThemeVariables;
  [key: string]: ThemeVariables;
}

export type I18nVariables = {
  sign_up?: {
    email_label?: string;
    password_label?: string;
    email_input_placeholder?: string;
    password_input_placeholder?: string;
    button_label?: string;
    loading_button_label?: string;
    social_provider_text?: string;
    link_text?: string;
    confirmation_text?: string;
  };
  sign_in?: {
    email_label?: string;
    password_label?: string;
    email_input_placeholder?: string;
    password_input_placeholder?: string;
    button_label?: string;
    loading_button_label?: string;
    social_provider_text?: string;
    link_text?: string;
  };
  magic_link?: {
    email_input_label?: string;
    email_input_placeholder?: string;
    button_label?: string;
    loading_button_label?: string;
    link_text?: string;
    confirmation_text?: string;
  };
  forgotten_password?: {
    email_label?: string;
    password_label?: string;
    email_input_placeholder?: string;
    button_label?: string;
    loading_button_label?: string;
    link_text?: string;
    confirmation_text?: string;
  };
  update_password?: {
    password_label?: string;
    password_input_placeholder?: string;
    button_label?: string;
    loading_button_label?: string;
    confirmation_text?: string;
  };
  verify_otp?: {
    email_input_label?: string;
    email_input_placeholder?: string;
    phone_input_label?: string;
    phone_input_placeholder?: string;
    token_input_label?: string;
    token_input_placeholder?: string;
    button_label?: string;
    loading_button_label?: string;
  };
};
