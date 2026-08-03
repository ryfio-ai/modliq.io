declare module 'zod' {
  export const z: any;
}
declare module 'bullmq' {
  export const Queue: any;
  export const Worker: any;
  export type Job<T = any> = any;
}
declare module 'ioredis' {
  const IORedis: any;
  export default IORedis;
}
