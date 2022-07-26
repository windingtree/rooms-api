import { ProfileRepo } from '../../data/profile/ProfileRepo'

import { CONSTANTS } from '../../common/constants'
import { IProfile, IProfileCollection } from '../../common/types'

const { SUPER_ADMIN, MANAGER, OWNER, OBSERVER } = CONSTANTS.PROFILE_ROLE

const profileRepo = new ProfileRepo()

async function getAllProfiles(requester: IProfile): Promise<IProfileCollection> {
  // TODO:
  //   1. `SUPER_ADMIN` can read any profile.
  //   2. `MANAGER` can read only his profile, and `OWNER` + `OBSERVER` profiles which he created.
  //   3. `OWNER`, `OBSERVER` can only see their own profiles.

  const profileCollection: IProfileCollection = await profileRepo.readProfiles()

  if (requester.role === SUPER_ADMIN) {
    return profileCollection
  } else if (requester.role === MANAGER) {
    return profileCollection.filter((/* profile: IProfile */) => {
      // TODO: Filter out profiles which were created by the manager. For now, returns all profiles.
      return true;
    })
  } else if (requester.role === OWNER || requester.role === OBSERVER) {
    return profileCollection.filter((/* profile: IProfile */) => {
      // TODO: Return only ONE profile, which belongs to the requester. For now, returns all profiles.
      return true;
    })
  }

  return []
}

export { getAllProfiles }
