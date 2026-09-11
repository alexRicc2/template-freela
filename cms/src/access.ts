import type { Access, PayloadRequest } from 'payload'

export const anyone: Access = () => true

export const authenticated: Access = ({ req: { user } }) => Boolean(user)

/** Admin UI access must return a boolean, not a Payload `Where` query. */
export const authenticatedAdmin = ({ req }: { req: PayloadRequest }) =>
  Boolean(req.user)
