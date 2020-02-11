const Express = require('express');
const router = Express.Router();
const auth = require('../../middleware/auth')
const Profile = require('../../models/profile')

const { check, validationResult } = require('express-validator')

// @route    api/profile/me
// @request  GET
// @desc  Get current user profile
// @access   private
router.get(
    '/me',
    auth,
    async (req, res) => {
        try {
            const profile = await Profile.findOne({ user: req.id }).populate('user'['name', 'avatar']);
            if (!profile) {
                return res.status(400).json({ msg: 'There is no profile for this user' })
            }
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Sever Error');
        }
    });

// @route    api/profile/me
// @request  POST
// @desc  create or update user profile
// @access   private

router.post(
    '/',
    [
        auth,
        [
            check('status', 'status is required')
                .not()
                .isEmpty(),
            check('skills', 'Skills is required')
                .not()
                .isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const {
            company,
            website,
            location,
            bio,
            status,
            githubusername,
            skills,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin
        } = req.body;

        //Build profile object
        const profileFields = {};
        profileFields.user = req.user.id;
        if (company) profileFields.company = company;
        if (website) profileFields.website = website;
        if (location) profileFields.location = location;
        if (bio) profileFields.bio = bio;
        if (status) profileFields.status = status;
        if (githubusername) profileFields.githubusername = githubusername;
        if (skills) {
            profileFields.skills = skills.split(',').map(skill => skill.trim());
        }

        // build social object
        profileFields.social = {}
        if (youtube) profileFields.social.youtube = youtube;
        if (twitter) profileFields.social.twitter = twitter;
        if (facebook) profileFields.social.facebook = facebook;
        if (linkedin) profileFields.social.linkedin = linkedin;
        if (instagram) profileFields.social.instagram = instagram;

        try {
            let profile = await Profile.findOne({ user: req.user.id })

            if (profile) {
                profile = await Profile.findOneAndUpdate(
                    {
                        user: req.user.id
                    },
                    {
                        $set: profileFields
                    },
                    {
                        new: true
                    }
                );
                return res.json({ profile });
            }

            // create
            profile = new Profile(profileFields);
            await profile.save();
            res.json(profile)

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }


    }
)

// @route    api/profile/me
// @request  GET
// @desc     Get all profiles
// @access   public
router.get(
    '/',
    async (req, res) => {
        try {
            const profiles = await Profile.find().populate('user', ['name', 'avatar']);
            res.json(profiles)
        } catch (error) {
            console.error(err.message);
            res.status(500).send('Server Error');

        }
    }

)

// @route    api/profile/userid
// @request  GET
// @desc     Get profile by user id
// @access   public

router.get(
    '/user/:user_id',
    async (req, res) => {
        try {
            const profile = await Profile.findOne(
                {
                    user: req.params.user_id
                }
            ).populate(
                'user', ['name', 'avatar']
            );
            if (!profile) {
                return res.status(400).json({ msg: 'There is no profile for this user' })
            }
            res.json(profile)
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error')
        }
    }
)
module.exports = router;