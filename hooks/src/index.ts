// Main index file for @muatmuat/hooks package
// All exports are handled via subpath exports
// This file exists to enable TypeScript compilation

// Basic hooks
export * from './use-debounce';
export * from './use-previous';
export * from './use-device';
export * from './use-countdown';

// DOM hooks
export * from './use-client-width';
export * from './use-client-height';
export * from './use-intersection-observer';
export * from './use-drag';

// Advanced hooks
export * from './use-shallow-effect';
export * from './use-shallow-memo';
export * from './use-debounce-callback';
export * from './auth-adapter';
export * from './swr-adapter';