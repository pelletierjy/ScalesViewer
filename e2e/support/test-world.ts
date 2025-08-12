import { IWorld } from '@cucumber/cucumber';
import { TestWorld } from './world';

export { TestWorld };

export interface ICustomWorld extends IWorld {
  world: TestWorld;
}