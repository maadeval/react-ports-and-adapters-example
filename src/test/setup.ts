import { expect, beforeEach } from 'vitest'
import matchers from '@testing-library/jest-dom/matchers'
import { cleanup } from '@testing-library/react'
import { randomUUID } from 'node:crypto'

window.crypto.randomUUID = randomUUID
expect.extend(matchers)

beforeEach(cleanup)
