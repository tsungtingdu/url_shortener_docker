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