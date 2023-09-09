import { Branch } from './branch.entity';

export const BranchProviders = [
  {
    provide: 'BRANCH_REPOSITORY',
    useValue: Branch,
  },
];
