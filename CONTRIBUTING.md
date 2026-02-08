# Contributing to Prep-CP

Thank you for your interest in contributing to Prep-CP! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the community
- Show empathy towards other community members

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/prep-CP.git`
3. Create a new branch: `git checkout -b feature/your-feature-name`
4. Follow the [SETUP.md](./SETUP.md) guide to set up your development environment

## Development Workflow

### 1. Branch Naming Convention

- Feature: `feature/description`
- Bug fix: `fix/description`
- Documentation: `docs/description`
- Refactor: `refactor/description`

Examples:
- `feature/add-python-support`
- `fix/login-validation`
- `docs/update-setup-guide`

### 2. Commit Messages

Follow the conventional commits format:

```
type(scope): subject

body (optional)

footer (optional)
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Examples:
```
feat(auth): add Google OAuth login
fix(editor): resolve paste prevention issue
docs(setup): add MongoDB Atlas instructions
```

### 3. Code Style

#### TypeScript/JavaScript
- Use TypeScript for new files
- Follow ESLint rules
- Use meaningful variable names
- Add comments for complex logic
- Keep functions small and focused

#### React Components
- Use functional components with hooks
- Extract reusable logic into custom hooks
- Keep components under 200 lines
- Use TypeScript interfaces for props

#### CSS/Tailwind
- Use Tailwind utility classes
- Follow existing design patterns
- Ensure responsive design (mobile-first)
- Test on multiple screen sizes

### 4. Testing

Before submitting:
```bash
# Run linter
npm run lint

# Run tests (when available)
npm test

# Test locally
npm run dev:all
```

Manual testing checklist:
- [ ] Feature works as expected
- [ ] No console errors
- [ ] Responsive design works
- [ ] No breaking changes to existing features

## Pull Request Process

### 1. Before Submitting

- Ensure your code follows the style guidelines
- Update documentation if needed
- Add/update tests for new features
- Test your changes thoroughly
- Rebase on latest main branch

### 2. PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
Describe testing done

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-reviewed my code
- [ ] Commented complex code
- [ ] Updated documentation
- [ ] No new warnings
- [ ] Added tests
```

### 3. Review Process

- Maintainers will review your PR
- Address feedback and requested changes
- Once approved, PR will be merged

## Project Structure

```
prep-CP/
├── pages/              # Next.js pages and API routes
├── components/         # React components
├── styles/            # Global styles
├── backend/           # Express backend
│   ├── models/       # Database models
│   ├── routes/       # API routes
│   └── utils/        # Utility functions
├── lib/              # Shared libraries
├── public/           # Static assets
└── docs/             # Documentation
```

## Key Areas for Contribution

### High Priority
1. **Problem Database**: Add coding problems with test cases
2. **Code Execution**: Improve sandbox security
3. **UI/UX**: Enhance animations and interactions
4. **Testing**: Add unit and integration tests
5. **Documentation**: Improve guides and API docs

### Feature Ideas
- New programming language support
- Advanced analytics dashboard
- Mobile app (React Native)
- VS Code extension
- Browser extension

### Bug Reports

Use GitHub Issues with:
- Clear description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Environment details (OS, browser, Node version)

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Tailwind CSS](https://tailwindcss.com/docs)

## Questions?

- Open a discussion on GitHub
- Check existing issues and discussions
- Join our community (Discord link TBD)

## License

By contributing, you agree that your contributions will be licensed under the project's license.

---

Thank you for contributing to Prep-CP! 🎉
