export interface dailyWorkDataProps {
  readonly region: string;
  readonly customer: string;
  readonly type: string;
  readonly helpdesk: string;
  readonly owner: string;
  readonly selectedDate: Date;
  readonly content: string;
}

export interface userInfoProps {
  readonly displayName: string;
  readonly email: string;
  readonly uid: string;
}

export interface userInfoUpdatesProps {
  [key: string]: {
    readonly name: string;
    readonly email: string;
  };
}
export interface dailyWorkUpdatesProps {
  [key: string]: {
    readonly region: string;
    readonly customer: string;
    readonly type: string;
    readonly helpdesk: string;
    readonly owner: string;
    readonly selectedDate: Date;
    readonly content: string;
  };
}
