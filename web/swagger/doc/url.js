/********************************************************************
* Url - Get url
* GET /api
********************************************************************/

/**
 * @swagger
 * /api:
 *   get:
 *     tags:
 *      - Url
 *     description: Url - get user's urls
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: success
 *       400:
 *         description: bad request
 */

/********************************************************************
* Url - Get url
* POST /api
********************************************************************/

/**
 * @swagger
 * /api:
 *   post:
 *     tags:
 *      - Url
 *     description: Url - post original url to get short url, vice versa
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: url
 *         description: put it url
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: success
 *       400:
 *         description: bad request
 */