/**
 * Single reference point for the CodeYetu brand mark.
 *
 * The PNG itself is NOT duplicated into /src/assets — this module points at
 * the existing file in the project root ("CodeYetu Logo.png", note the space
 * in the filename). Import `logo` from here rather than re-importing the
 * path, so the asset only has to move in one place.
 */
import logo from '../../CodeYetu Logo.png';

export { logo };
export default logo;
