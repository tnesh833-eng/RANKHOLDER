export type RankHolderUser = {
  uid: string;
  email: string | null;
  displayName: string | null;
};

export type AuthFeedback = {
  kind: "success" | "error" | "info";
  message: string;
};

declare global {
  interface Window {
    rankHolderUser?: RankHolderUser | null;
  }
}
