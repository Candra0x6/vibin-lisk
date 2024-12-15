// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract Vibin {
    struct Expression {
        address owner;
        string content;
        string mood;
        string vibe;
        string imageUrl;
        string videoUrl;
        uint256 timestamp;
    }

    Expression[] public expressions;

    mapping(address => uint256[]) public userExpressions;

    event ExpressionCreated(
        uint256 indexed expressionId,
        address indexed owner
    );
    event ExpressionUpdated(uint256 indexed expressionId);
    event ExpressionDeleted(uint256 indexed expressionId);

    modifier onlyOwner(uint256 _expressionId) {
        require(
            msg.sender == expressions[_expressionId].owner,
            "Only owner can update or delete the expression"
        );
        _;
    }

    function createExpression(
        string memory _content,
        string memory _mood,
        string memory _vibe,
        string memory _imageUrl,
        string memory _videoUrl
    ) public returns (uint256) {
        require(bytes(_content).length > 0, "Content cannot be empty");
        require(bytes(_mood).length > 0, "Mood cannot be empty");
        require(bytes(_vibe).length > 0, "Vibe cannot be empty");

        Expression memory newExpression = Expression({
            owner: msg.sender,
            content: _content,
            mood: _mood,
            vibe: _vibe,
            imageUrl: _imageUrl,
            videoUrl: _videoUrl,
            timestamp: block.timestamp
        });

        uint256 newExpressionId = expressions.length;
        expressions.push(newExpression);

        userExpressions[msg.sender].push(newExpressionId);

        emit ExpressionCreated(newExpressionId, msg.sender);

        return newExpressionId;
    }

    function updateExpression(
        uint256 _expressionId,
        string memory _content,
        string memory _mood,
        string memory _vibe,
        string memory _imageUrl,
        string memory _videoUrl
    ) public onlyOwner(_expressionId) {
        require(bytes(_content).length > 0, "Content cannot be empty");
        require(bytes(_mood).length > 0, "Mood cannot be empty");
        require(bytes(_vibe).length > 0, "Vibe cannot be empty");

        Expression storage expression = expressions[_expressionId];
        expression.content = _content;
        expression.mood = _mood;
        expression.vibe = _vibe;
        expression.imageUrl = _imageUrl;
        expression.videoUrl = _videoUrl;

        emit ExpressionUpdated(_expressionId);
    }

    function deleteExpression(
        uint256 _expressionId
    ) public onlyOwner(_expressionId) {
        uint256 lastIndex = expressions.length - 1;
        expressions[_expressionId] = expressions[lastIndex];
        expressions.pop();

        emit ExpressionDeleted(_expressionId);
    }

    function getAllExpressions() public view returns (Expression[] memory) {
        return expressions;
    }

    function getUserExpressions() public view returns (Expression[] memory) {
        uint256[] memory userExpressionIds = userExpressions[msg.sender];
        Expression[] memory userExpressionsArray = new Expression[](
            userExpressionIds.length
        );

        for (uint256 i = 0; i < userExpressionIds.length; i++) {
            userExpressionsArray[i] = expressions[userExpressionIds[i]];
        }

        return userExpressionsArray;
    }

    function getTotalExpressions() public view returns (uint256) {
        return expressions.length;
    }
}
