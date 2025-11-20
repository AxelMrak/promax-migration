import type { User } from "@/features/user/types";
import { UserLevel } from "@/features/user/types";

export function getVisibleUsersForRole(
  currentUser: User | undefined,
  allUsers: User[],
): User[] {
  if (!currentUser) return [];

  switch (currentUser.user_level) {
    case UserLevel.ADMIN:
      return allUsers;

    case UserLevel.MANAGER:
      return allUsers.filter((user) => {
        if (user.user_level === UserLevel.ADMIN) return false;
        return true;
      });

    case UserLevel.MONTEUR:
    default:
      return [];
  }
}
