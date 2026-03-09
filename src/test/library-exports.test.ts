import { describe, expect, test } from 'vitest';
import * as demoExports from '../lib/demo';
import * as rootExports from '../lib';

describe('library exports', () => {
  test('keeps demo-only fixtures off the root entrypoint', () => {
    expect(rootExports).toHaveProperty('MissionControlShell');
    expect(rootExports).toHaveProperty('NewsfeedScreen');
    expect(rootExports).not.toHaveProperty('DEMO_NEWSFEED_ARTICLES');
    expect(rootExports).not.toHaveProperty('AllComponentsScreen');
  });

  test('exposes demo fixtures through the dedicated demo entrypoint', () => {
    expect(demoExports).toHaveProperty('DEMO_NEWSFEED_ARTICLES');
    expect(demoExports).toHaveProperty('DEMO_PROJECTS');
  });
});
