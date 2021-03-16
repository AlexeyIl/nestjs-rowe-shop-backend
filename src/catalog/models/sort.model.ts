import { FilterSettingsInterface } from './filter.model';
export class SortModel {
  sortPoll;
  descending;
  sortPollList = ['ABC', 'code', 'pack', 'category', 'group', 'name', 'sae', 'quantity', 'price']
  constructor(sortSettings: SortSettingsInterface) {
    this.sortPoll = this.sortPollList.indexOf(sortSettings.sortPoll) > -1 ? sortSettings.sortPoll : 'quantity';
    this.descending = sortSettings.descending;
  }

  get getSortString(): string {
    return this.descending ? this.sortPoll : `-${this.sortPoll}`;
  }
}

export interface SortSettingsInterface {
  sortPoll?: string;
  descending?: boolean;
}
