/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { Profile } from 'passport';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor() {
    super({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
      scope: ['user:email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: Error | null, user?: any) => void,
  ): Promise<any> {
    try {
      // Ensure required profile data exists
      if (!profile?.id) {
        throw new Error('GitHub profile data is incomplete');
      }

      const user = {
        githubId: profile.id,
        username: profile.username || profile.displayName || 'unknown',
        displayName: profile.displayName || profile.username || 'GitHub User',
        email: this.getPrimaryEmail(profile.emails),
        avatar: this.getPrimaryPhoto(profile.photos),
        accessToken,
      };

      return done(null, user);
    } catch (err) {
      return done(
        err instanceof Error ? err : new Error('Authentication failed'),
      );
    }
  }

  private getPrimaryEmail(
    emails?: Array<{ value: string }>,
  ): string | undefined {
    return emails?.[0]?.value;
  }

  private getPrimaryPhoto(
    photos?: Array<{ value: string }>,
  ): string | undefined {
    return photos?.[0]?.value;
  }
}
